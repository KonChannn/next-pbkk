import { Typography, Card, CardBody, CardHeader, Button, CardProps } from "./MTailwind";
import Image from "next/image";


interface CourseCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  label: string;
}

export function CourseCard({ img, tag, title, desc, label, ...props }: CourseCardProps & CardProps) {
  return (
    <Card className="border" {...props} placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
      <CardHeader className="h-64" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </CardHeader>
      <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <div className="flex items-center gap-2">
          <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-gray-500"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {tag}
          </Typography>
        </div>
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography
            variant="h5"
            className="mb-2 normal-case"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {title}
          </Typography>
        </a>
        <Typography
          className="mb-6 font-normal !text-gray-500"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          {desc}
        </Typography>
        <Button 
          variant="outlined" 
          placeholder="" 
          onPointerEnterCapture={() => {}} 
          onPointerLeaveCapture={() => {}}
        >
          {label}
        </Button>
      </CardBody>
    </Card>
  );
}

export default CourseCard;