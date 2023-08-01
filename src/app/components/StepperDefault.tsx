'use client'
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
      >
        <Step onClick={() => setActiveStep(1)} />
        <Step onClick={() => setActiveStep(2)} />
        <Step onClick={() => setActiveStep(3)} />
      </Stepper>
      <div className="flex justify-center gap-8">
        <button onClick={handlePrev} disabled={isFirstStep}>back</button>
        <button onClick={handleNext} disabled={isLastStep}>next</button>
      </div>
    </div>
  )
}
