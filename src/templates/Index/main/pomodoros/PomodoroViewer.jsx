import { useTimer } from '@mzaleski/use-timer';
import { Card, Metric, Text, Button, Grid, Col, Flex } from "@tremor/react";

function PomodoroViewer () {
    //https://github.com/maxzaleski/useTimer#readme
    // https://ryanhefner.github.io/react-timer-wrapper/
     
    const { timeRemaining, secondsRemaining, setFreeze, resetTimer } = useTimer(2400, true,                               
    () => console.log('Timer finished!') 
    );
    
    return(
        <div id="PomodoroViewer" className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 my-5" style={{display : "block"}}>
            <Grid numItems={11} className='gap-4'>
                <Col numColSpan={6} className="text-start">
                    <h1 className="text-3xl font-bold">Pomodoro</h1>
                    <Text className="text-base">Planteate una meta de tiempo para completar tus objetivos. ¿Cuantas tareas puedes acabar antes de que termine el tiempo?</Text>
                </Col>
                <Col numColSpan={3} className='border-x px-5'>
                    <Card className="mx-auto" decorationColor="violet">
                        <Metric fontSize={20} >{timeRemaining}</Metric>
                        <Text>Tiempo restante</Text>
                    </Card>
                </Col>
                <Col numColSpan={2} className='flex flex-col gap-2 justify-center'>
                    <div className='grid grid-cols-2 gap-2 justify-between'>
                        <Button className='w-full' size="sm" color='violet' onClick={() => setFreeze(true)}>Pausar</Button>
                        <Button className='w-full' size="sm" color='violet' onClick={() => resetTimer()}>Reiniciar</Button>
                    </div>
                    <div>
                        <Button className='w-full' size="sm" color='violet' onClick={() => setFreeze(false)}>Comenzar</Button>
                    </div>
                </Col>
            </Grid>
        </div>
    )
}

export default PomodoroViewer;