"use client"

import * as React from "react"
import { ArrowLeft, ArrowRightNav } from "@/components/icons"

type CarouselApi = {
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

type CarouselProps = {
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
} & React.HTMLAttributes<HTMLDivElement>

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement | null>
  api: CarouselApi
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      setApi,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const carouselRef = React.useRef<HTMLDivElement>(null)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const updateScrollButtons = React.useCallback(() => {
      const element = carouselRef.current
      if (!element) return

      if (orientation === "horizontal") {
        setCanScrollPrev(element.scrollLeft > 0)
        setCanScrollNext(
          element.scrollLeft < element.scrollWidth - element.clientWidth - 1
        )
      } else {
        setCanScrollPrev(element.scrollTop > 0)
        setCanScrollNext(
          element.scrollTop < element.scrollHeight - element.clientHeight - 1
        )
      }
    }, [orientation])

    const scrollPrev = React.useCallback(() => {
      const element = carouselRef.current
      if (!element) return

      const scrollAmount = orientation === "horizontal" 
        ? element.clientWidth 
        : element.clientHeight

      if (orientation === "horizontal") {
        element.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        element.scrollBy({ top: -scrollAmount, behavior: "smooth" })
      }
    }, [orientation])

    const scrollNext = React.useCallback(() => {
      const element = carouselRef.current
      if (!element) return

      const scrollAmount = orientation === "horizontal" 
        ? element.clientWidth 
        : element.clientHeight

      if (orientation === "horizontal") {
        element.scrollBy({ left: scrollAmount, behavior: "smooth" })
      } else {
        element.scrollBy({ top: scrollAmount, behavior: "smooth" })
      }
    }, [orientation])

    const api: CarouselApi = React.useMemo(
      () => ({
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [scrollPrev, scrollNext, canScrollPrev, canScrollNext]
    )

    React.useEffect(() => {
      if (setApi) {
        setApi(api)
      }
    }, [api, setApi])

    React.useEffect(() => {
      const element = carouselRef.current
      if (!element) return

      updateScrollButtons()
      element.addEventListener("scroll", updateScrollButtons)
      window.addEventListener("resize", updateScrollButtons)

      return () => {
        element.removeEventListener("scroll", updateScrollButtons)
        window.removeEventListener("resize", updateScrollButtons)
      }
    }, [updateScrollButtons])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft" && orientation === "horizontal") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight" && orientation === "horizontal") {
          event.preventDefault()
          scrollNext()
        } else if (event.key === "ArrowUp" && orientation === "vertical") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowDown" && orientation === "vertical") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext, orientation]
    )

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={className}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      style={{ 
        overflow: "auto",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        ...style
      }}
      className={className}
    >
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
        }}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={className}
      style={{
        minWidth: orientation === "horizontal" ? "0" : "100%",
        paddingLeft: orientation === "horizontal" ? "0.5rem" : "0",
        paddingRight: orientation === "horizontal" ? "0.5rem" : "0",
        paddingTop: orientation === "vertical" ? "0.5rem" : "0",
        paddingBottom: orientation === "vertical" ? "0.5rem" : "0",
      }}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={className}
      aria-label="Previous slide"
      {...props}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="sr-only">Previous</span>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      type="button"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={className}
      aria-label="Next slide"
      {...props}
    >
      <ArrowRightNav className="w-4 h-4" />
      <span className="sr-only">Next</span>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
