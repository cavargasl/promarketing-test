import { cn } from "@/lib/utils"
import React, { cloneElement, forwardRef, useContext, useEffect, useMemo, type ReactElement } from "react"
import StepperContext from "./StepperContext"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement[]
  activeStep: number
  isLastStep: (value: boolean) => void
  isFirstStep: (value: boolean) => void
}
const Stepper = forwardRef<
  HTMLDivElement,
  StepperProps
>(({ className, isLastStep, isFirstStep, activeStep, ...props }, ref) => {
  const { children } = props

  const childrenArray = React.Children.toArray(children).filter(Boolean)
  const steps = childrenArray.map((step, index) => {
    return cloneElement(step as React.ReactElement, {
      index,
    })
  })

  useEffect(() => {
    isLastStep(activeStep === props.children.length - 1)
    isFirstStep(activeStep === 0)
  }, [activeStep, isLastStep, isFirstStep, props.children.length])

  const contextValue = useMemo(
    () => ({ activeStep }),
    [activeStep]
  )

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn("relative flex w-full items-center justify-between gap-1", className)}
        {...props}
      >
        {steps}
      </div>
    </StepperContext.Provider>
  )
})
Stepper.displayName = "Stepper"


interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  activeClassName?: string
  completedClassName?: string
  StepIconComponent?: React.ReactNode
  children?: React.ReactElement<StepContentProps>
}
const Step = forwardRef<
  HTMLDivElement,
  StepProps
>(({ className, StepIconComponent, index, activeClassName, completedClassName, ...props }, ref) => {
  const { children } = props
  const { activeStep } = useContext(StepperContext)
  if (index === undefined) return null

  const stepContent = children && cloneElement(children, {
    index,
  })

  if (!StepIconComponent) return (
    <div
      className={cn("relative h-4 w-4 cursor-pointer rounded-full bg-neutral", className,
        index === activeStep && `${activeClassName ? activeClassName : "border border-success bg-success-foreground text-success"}`,
        (index < activeStep) && `${completedClassName ? completedClassName : "bg-success text-background"}`)}
    >
      {stepContent}
    </div>
  )

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn("flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral text-neutral-foreground", className,
          index === activeStep && `${activeClassName ? activeClassName : "border border-success bg-success-foreground text-success"}`,
          (index < activeStep) && `${completedClassName ? completedClassName : "bg-success text-background"}`
        )}
        {...props}
      >
        {StepIconComponent}
      </div>
      {stepContent}
    </div>
  )
})
Step.displayName = "Step"


interface StepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  activeClassName?: string
  completedClassName?: string
}
const StepContent = forwardRef<
  HTMLDivElement,
  StepContentProps
>(({ className, index, activeClassName, completedClassName, ...props }, ref) => {
  const { activeStep } = useContext(StepperContext)
  if (index === undefined) return null
  return (
    <div
      ref={ref}
      className={cn("absolute left-[50%] top-[calc(100%+1rem)] flex w-max -translate-x-2/4 flex-col items-center justify-center gap-1 text-neutral-foreground", className,
        index === activeStep && `${activeClassName ? activeClassName : "text-success"}`,
        (index < activeStep) && `${completedClassName ? completedClassName : "text-success"}`
      )}
      {...props}
    >
      {props.children}
    </div>
  )
})
StepContent.displayName = "StepContent"


export { Step, StepContent, Stepper }

