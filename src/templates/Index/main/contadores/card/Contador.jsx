import { Card, Metric, Text } from "@tremor/react";

function Contador ({titulo, cifra}) {

  return(
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="violet">
      <Text>{titulo}</Text>
      <Metric>#{cifra}</Metric>
    </Card>
  )
}

export default Contador; 