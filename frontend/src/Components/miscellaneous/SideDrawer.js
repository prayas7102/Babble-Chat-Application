import React, {useState} from 'react'
import { Box } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/react';

const SideDrawer = () => {
  
  const [search, useSearch]=useState("");
  const [searchResult, useSearchResult]=useState("");
  const [loading, useLoading]=useState(false);
  const [loadingChat, useLoadingChat]=useState("");

  return (
    <div>
      <Box>
        <Tooltip label="Search Users"></Tooltip>
      </Box>
    </div>
  )
}

export default SideDrawer