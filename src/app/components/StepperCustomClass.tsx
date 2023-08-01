'use client'
import { Icons } from '@/components/Icons'
import { Step, StepContent, Stepper } from '@/components/ui/Stepper'
import useStepper from '@/hooks/useStepper'

export default function StepperCustomClass() {
  const { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep, setActiveStep } = useStepper()

  return (
    <div className='flex flex-col gap-4'>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step
          onClick={() => setActiveStep(1)}
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
          onClick={() => setActiveStep(2)}
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
          onClick={() => setActiveStep(3)}
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
        <button onClick={handlePrev} disabled={isFirstStep}>back</button>
        <button onClick={handleNext} disabled={isLastStep}>next</button>
      </div>
    </div>
  )
}