import React from "react";

import { Typography, Card, CardBody, Avatar, Rating } from "./MTailwind";

interface FeedbackCardProps {
  img: string;
  feedback: string;
  client: string;
  title: string;
}

export function FeedbackCard({ img, feedback, client, title }: FeedbackCardProps) {
  return (
    <Card shadow={false} className="items-start text-left" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
      <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <Avatar 
          src={img} 
          className="mb-2" 
          alt={client} 
          size="xl" 
          placeholder="" 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}} 
        />
        <Typography 
          variant="h6" 
          color="blue-gray" 
          placeholder="" 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}>
          {client}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-1 mb-5 block font-normal"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="mb-6 font-normal text-gray-500"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          &quot;{feedback}&quot;
        </Typography>
        <Rating 
          value={5} 
          readonly 
          placeholder="" 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}} 
        />
      </CardBody>
    </Card>
  );
}
export default FeedbackCard;