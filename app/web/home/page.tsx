import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComicPage() {
  return (
    <div className="mx-auto p-8 space-y-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-600">
        Welcome to Comic World!
      </h1>
      <p className="text-lg text-center text-gray-600">
        Explore exciting stories from your favorite comic genres!
      </p>

      {/* Comic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Comic Card 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">The Galactic Odyssey</CardTitle>
            <CardDescription className="text-sm text-gray-500">A thrilling space adventure.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Follow Captain Nova as she defends the universe against cosmic threats!
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="primary">
              Read More
            </Button>
          </CardFooter>
        </Card>

        {/* Comic Card 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Mystic Realms</CardTitle>
            <CardDescription className="text-sm text-gray-500">Step into a world of magic.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Discover enchanted lands and ancient spells in this fantasy epic!
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="secondary">
              Read More
            </Button>
          </CardFooter>
        </Card>

        {/* Comic Card 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Cyberpunk Chronicles</CardTitle>
            <CardDescription className="text-sm text-gray-500">A gritty cyberpunk tale.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Dive into the neon-lit world of hackers, robots, and mega-corporations.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Read More
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
