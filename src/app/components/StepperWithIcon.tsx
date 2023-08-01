'use client'
import { Icons } from '@/components/Icons'
import { Step, Stepper } from '@/components/ui/Stepper'
import useStepper from '@/hooks/useStepper'

export default function StepperWithIcon() {
  const { activeStep, isLastStep, isFirstStep, handleNext, handlePrev, setIsLastStep, setIsFirstStep, setActiveStep } = useStepper()

  return (
    <div className='flex flex-col gap-4'>
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(1)} StepIconComponent={1} />
        <Step onClick={() => setActiveStep(2)} StepIconComponent={<Icons.home className="h-5 w-5" />} />
        <Step onClick={() => setActiveStep(3)} StepIconComponent={<Icons.user className="h-5 w-5" />} />
      </Stepper>
      <div className="flex justify-center gap-8">
        <button onClick={handlePrev} disabled={isFirstStep}>back</button>
        <button onClick={handleNext} disabled={isLastStep}>next</button>
      </div>
    </div>
  )
}
