import React from "react";
import { useGetAllBoardsQuery } from "../../api/boardsApi";
import { Card } from "../../components/Card/Card";

export const Main = () => {
  const { data: boards, isLoading, isError } = useGetAllBoardsQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <div>
      {boards.data.map((board) => (
        <Card key={board.id} id={board.id} name={board.name} />
      ))}
    </div>
  );
};
