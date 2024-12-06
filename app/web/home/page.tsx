"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "../../MTailwind";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ComicPage() {
  return (
    <>
      <Navbar />
      <div className="w-full px-8 py-6">
        {/* Comic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Comic Card 1 */}
          <Card className="shadow-lg min-h-[28rem]">
            <CardHeader floated={false} className="h-72 p-0 m-0">
              <img
                src="/path-to-image.jpg"
                alt="The Galactic Odyssey"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                The Galactic Odyssey
              </Typography>
              <Typography color="gray">
                A thrilling space adventure. Follow Captain Nova as she defends the universe against cosmic threats!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button color="blue" fullWidth>
                Read More
              </Button>
            </CardFooter>
          </Card>

          {/* Comic Card 2 */}
          <Card className="shadow-lg min-h-[28rem]">
            <CardHeader floated={false} className="h-72 p-0 m-0">
              <img
                src="/path-to-image.jpg"
                alt="The Galactic Odyssey"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                The Galactic Odyssey
              </Typography>
              <Typography color="gray">
                A thrilling space adventure. Follow Captain Nova as she defends the universe against cosmic threats!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button color="blue" fullWidth>
                Read More
              </Button>
            </CardFooter>
          </Card>

          {/* Comic Card 3 */}
          <Card className="shadow-lg min-h-[28rem]">
            <CardHeader floated={false} className="h-72 p-0 m-0">
              <img
                src="/path-to-image.jpg"
                alt="The Galactic Odyssey"
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                The Galactic Odyssey
              </Typography>
              <Typography color="gray">
                A thrilling space adventure. Follow Captain Nova as she defends the universe against cosmic threats!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button color="blue" fullWidth>
                Read More
              </Button>
            </CardFooter>
          </Card>

          {/* Comic Card 4 */}
          <Card className="shadow-lg min-h-[28rem]">
           <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="h-72 p-0 m-0"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="ui/ux review check"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" className="mb-2">
                The Galactic Odyssey
              </Typography>
              <Typography color="gray">
                A thrilling space adventure. Follow Captain Nova as she defends the universe against cosmic threats!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button color="blue" fullWidth>
                Read More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
