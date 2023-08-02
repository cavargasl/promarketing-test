'use client'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Step, StepConnector, StepContent, Stepper } from '@/components/ui/Stepper'
import useStepper from '@/hooks/useStepper'

export default function StepperCustomClass() {
  const { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep, setActiveStep } = useStepper()

  return (
    <div className='flex flex-col gap-4'>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        connector={<StepConnector className='h-3 bg-red-500' completedClassName='h-3 bg-yellow-500' />}
        setActiveStep={setActiveStep}
      >
        <Step
          StepIconComponent={1}
          activeClassName='bg-yellow-500 text-white'
          completedClassName='bg-blue-500 text-white'
          className='bg-cyan-500 text-white'
        >
          <StepContent
            activeClassName='text-yellow-500'
            completedClassName='text-blue-500'
            className='text-cyan-500'
          >
            Step 1
          </StepContent>
        </Step>
        <Step
          StepIconComponent={<Icons.home className="h-14 w-14" />}
          activeClassName='bg-yellow-500 text-white'
          completedClassName='bg-blue-500 text-white'
          className='h-20 w-20 rounded-md bg-cyan-500 text-white'
        >
          <StepContent
            activeClassName='text-yellow-500'
            completedClassName='text-blue-500'
            className='text-cyan-500'
          >
            <p>Step 2</p>
            <p>more info</p>
          </StepContent>
        </Step>
        <Step
          StepIconComponent={<Icons.user className="h-5 w-5" />}
          activeClassName='bg-yellow-500 text-white'
          completedClassName='bg-blue-500 text-white'
          className='bg-cyan-500 text-white'
        >
          <StepContent
            activeClassName='text-yellow-500'
            completedClassName='text-blue-500'
            className='text-cyan-500'
          >
            <p>Step 3</p>
          </StepContent>
        </Step>
      </Stepper>
      <div className="mt-20 flex justify-center gap-8">
        <Button onClick={handlePrev} disabled={isFirstStep} variant={'outline'}>
          <Icons.home className="h-5 w-5" />
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          <Icons.home className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
