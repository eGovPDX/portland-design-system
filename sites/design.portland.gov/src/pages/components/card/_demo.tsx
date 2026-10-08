import { Button } from "@cityofportland/components-react/button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "@cityofportland/components-react/card";

import { Code } from "../../../components/code";

export function DemoCard() {
  return (
    <div className="flex flex-col gap-xs">
      <Code
        language="tsx"
        code={`
<Card>
  <CardMedia>
    <img
      src="https://picsum.photos/id/24/800/450"
      alt="An open book on a library table"
    />
  </CardMedia>
  <CardBody>
    <CardTitle>
      <h3>Find your nearest library</h3>
    </CardTitle>
    <CardDescription>
      <p>See hours, events, and services at branches near you.</p>
    </CardDescription>
    <CardFooter>
      <Button
        color="primary"
        variant="moderate"
        size="md"
        className="rounded-md"
      >
        View library locations
      </Button>
    </CardFooter>
  </CardBody>
</Card>`}
      />
      <div className="flex flex-col xl:flex-row items-start xl:items-center gap-md">
        <Card>
          <CardMedia>
            <img
              src="https://picsum.photos/id/24/800/450"
              alt="An open book on a library table"
            />
          </CardMedia>
          <CardBody>
            <CardTitle>Find your nearest library</CardTitle>
            <CardDescription>
              See hours, events, and services at branches near you.
            </CardDescription>
            <CardFooter>
              <Button
                color="primary"
                variant="moderate"
                size="md"
                className="rounded-md"
              >
                View library locations
              </Button>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
