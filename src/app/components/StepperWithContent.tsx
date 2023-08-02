'use client'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Step, StepContent, Stepper } from '@/components/ui/Stepper'
import useStepper from '@/hooks/useStepper'

export default function StepperWithContent() {
  const { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep, setActiveStep } = useStepper()

  return (
    <div className='flex flex-col gap-4'>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(1)} StepIconComponent={1} >
          <StepContent>Step 1</StepContent>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <StepContent>
            <p>Step 2</p>
            <p>more info</p>
          </StepContent>
        </Step>
        <Step onClick={() => setActiveStep(3)} StepIconComponent={<Icons.user className="h-5 w-5" />}>
          <StepContent>
            <p>Step 3</p>
          </StepContent>
        </Step>
      </Stepper>
      <div className="mt-20 flex justify-center gap-8">
        <Button onClick={handlePrev} disabled={isFirstStep} variant={'outline'}>back</Button>
        <Button onClick={handleNext} disabled={isLastStep} variant={'outline-accent'}>next</Button>
      </div>
    </div>
  )
}
