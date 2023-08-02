'use client'
import { Button } from '@/components/ui/Button'
import { Step, Stepper } from '@/components/ui/Stepper'
import useStepper from '@/hooks/useStepper'

export default function StepperDefault() {
  const { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep, setActiveStep } = useStepper()

  return (
    <div className='flex flex-col gap-4'>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        setActiveStep={setActiveStep}
      >
        <Step />
        <Step />
        <Step />
        <Step />
      </Stepper>
      <div className="flex justify-center gap-8">
        <Button onClick={handlePrev} disabled={isFirstStep}>back</Button>
        <Button onClick={handleNext} disabled={isLastStep}>next</Button>
      </div>
    </div>
  )
}
