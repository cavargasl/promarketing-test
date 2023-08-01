import { cn } from "@/lib/utils"
import React, { cloneElement, forwardRef, useEffect, type ReactElement } from "react"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement[]
  activeStep: number
  isLastStep: (value: boolean) => void
  isFirstStep: (value: boolean) => void
}
const Stepper = forwardRef<
  HTMLDivElement,
  StepperProps
>(({ className, activeStep, isLastStep, isFirstStep, ...props }, ref) => {

  useEffect(() => {
    isLastStep(activeStep === props.children.length - 1)
    isFirstStep(activeStep === 0)
  }, [activeStep, isLastStep, isFirstStep, props.children.length])

  return (
    <section
      ref={ref}
      className={cn("relative flex w-full items-center justify-between gap-1", className)}
      {...props}
    >
      {props.children.map((child, index) => {
        const className = (child.props as { className?: string }).className
        const activeClassName = (child.props as { activeClassName?: string }).activeClassName
        const completedClassName = (child.props as { completedClassName?: string }).completedClassName

        return cloneElement(child, {
          className: cn(
            className,
            index === activeStep && `${activeClassName ? activeClassName : "border border-success bg-success-foreground text-success"}`,
            index < activeStep && `${completedClassName ? completedClassName : "bg-success text-background"}`,
          ),
          key: index
        })
      })}
    </section>
  )
})
Stepper.displayName = "Stepper"

const Step = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { activeClassName?: string, completedClassName?: string }
>(({ className, ...props }, ref) => {
  if (props.children === undefined) return <div className={cn("h-4 w-4 cursor-pointer rounded-full bg-neutral", className)} />

  return (
    <div
      ref={ref}
      className={cn("flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral text-neutral-foreground", className)}
      {...props}
    />
  )
})
Step.displayName = "Step"

export { Step, Stepper }

