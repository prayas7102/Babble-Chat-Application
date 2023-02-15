const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");

// only for one-to-one chat. not group chat
// returns a chatroom b/w two users if exsists.
// if it does'nt exsist, it creates new chatroom and returns it.

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        // checking a common chatroom b/w two users (logged in user and user with userId id)
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    // if chatroom exsists, then isChat length is always == 1

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

// fetch all chats of logged in user

const fetchChats = (async (req, res) => {
    try {
        await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = (async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGroup = (async (req, res) => {

    // chatName is new chat name
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);
    }
});

const removeFromGroup = (async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    let removed;
    const RequiredChat = await Chat.findById(chatId);
    if (RequiredChat) {
        const currentUser = String(req.user._id), groupAdmin = String(RequiredChat.groupAdmin);
        if (groupAdmin === currentUser) {
            removed = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $pull: { users: userId },
                },
                {
                    new: true,
                }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
        }
        else {
            res.status(404);
            console.log(RequiredChat.groupAdmin, req.user._id)
            throw new Error("You're not group admin !!");
        }
    }

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
});

const addToGroup = (async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    let added;
    const RequiredChat = await Chat.findById(chatId);
    if (RequiredChat) {
        const currentUser = String(req.user._id), groupAdmin = String(RequiredChat.groupAdmin);
        if (groupAdmin === currentUser) {
            added = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $push: { users: userId },
                },
                {
                    new: true,
                }
            )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");
        }
        else {
            res.status(404);
            console.log(RequiredChat.groupAdmin, req.user._id)
            throw new Error("You're not group admin !!");
        }
    }

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
});

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
};
