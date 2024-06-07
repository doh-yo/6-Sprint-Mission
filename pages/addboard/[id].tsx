import { Container } from "@/styles/CommonStyles";
import { useRouter } from "next/router";
import React from "react";

const AddBoardPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Container>{id}번 상세 게시글 페이지</Container>;
};

export default AddBoardPage;
