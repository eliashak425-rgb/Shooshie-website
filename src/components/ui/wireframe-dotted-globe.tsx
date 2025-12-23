"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
}

// Belgium coordinates
const BELGIUM_COORDS: [number, number] = [4.4699, 50.5039]

export default function RotatingEarth({ width = 800, height = 600, className = "" }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.2

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const pi = polygon[i]!
        const pj = polygon[j]!
        const [xi, yi] = [pi[0]!, pi[1]!]
        const [xj, yj] = [pj[0]!, pj[1]!]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates
        if (!pointInPolygon(point, coordinates[0])) return false
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) return true
          }
        }
        return false
      }
      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 14) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) {
            dots.push(point)
          }
        }
      }
      return dots
    }

    interface DotData {
      lng: number
      lat: number
      visible: boolean
    }

    const allDots: DotData[] = []
    let landFeatures: any

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      // Draw ocean (globe background) - dark
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = "#0a0a0b"
      context.fill()
      
      // Grey border
      context.strokeStyle = "#3f3f46"
      context.lineWidth = 1.5 * scaleFactor
      context.stroke()

      if (landFeatures) {
        // Draw graticule in grey
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = "#27272a"
        context.lineWidth = 0.5 * scaleFactor
        context.globalAlpha = 0.4
        context.stroke()
        context.globalAlpha = 1

        // Draw land outlines in grey
        context.beginPath()
        landFeatures.features.forEach((feature: any) => {
          path(feature)
        })
        context.strokeStyle = "#52525b"
        context.lineWidth = 1 * scaleFactor
        context.stroke()

        // Draw halftone dots in grey
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#3f3f46"
            context.fill()
          }
        })

        // Draw Belgium marker - PURPLE NEON
        const belgiumProjected = projection(BELGIUM_COORDS)
        if (belgiumProjected) {
          const rotation = projection.rotate()
          const center: [number, number] = [-rotation[0], -rotation[1]]
          const distance = d3.geoDistance(BELGIUM_COORDS, center)
          
          if (distance < Math.PI / 2) {
            // Outer glow
            context.beginPath()
            context.arc(belgiumProjected[0], belgiumProjected[1], 20 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "rgba(168, 85, 247, 0.15)"
            context.fill()
            
            // Middle glow
            context.beginPath()
            context.arc(belgiumProjected[0], belgiumProjected[1], 12 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "rgba(168, 85, 247, 0.3)"
            context.fill()
            
            // Inner glow
            context.beginPath()
            context.arc(belgiumProjected[0], belgiumProjected[1], 6 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "rgba(168, 85, 247, 0.5)"
            context.fill()
            
            // Core point
            context.beginPath()
            context.arc(belgiumProjected[0], belgiumProjected[1], 4 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "#a855f7"
            context.shadowColor = "#a855f7"
            context.shadowBlur = 20
            context.fill()
            context.shadowBlur = 0

            // Label "Belgium"
            context.font = `bold ${14 * scaleFactor}px Inter, sans-serif`
            context.fillStyle = "#e9d5ff"
            context.textAlign = "center"
            context.shadowColor = "#a855f7"
            context.shadowBlur = 15
            context.fillText("Belgium", belgiumProjected[0], belgiumProjected[1] - 28 * scaleFactor)
            context.shadowBlur = 0
            
            // Subtle underline
            const textWidth = context.measureText("Belgium").width
            context.beginPath()
            context.moveTo(belgiumProjected[0] - textWidth / 2, belgiumProjected[1] - 24 * scaleFactor)
            context.lineTo(belgiumProjected[0] + textWidth / 2, belgiumProjected[1] - 24 * scaleFactor)
            context.strokeStyle = "#a855f7"
            context.lineWidth = 1
            context.globalAlpha = 0.5
            context.stroke()
            context.globalAlpha = 1
          }
        }
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!response.ok) throw new Error("Failed to load land data")
        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const dots = generateDotsInPolygon(feature, 14)
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
          })
        })

        render()
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load map data")
        setIsLoading(false)
      }
    }

    // Start centered on Europe/Belgium
    const rotation: [number, number, number] = [-4.5, -50, 0]
    let autoRotate = true
    const rotationSpeed = 0.15

    projection.rotate(rotation)

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
        render()
      }
    }

    const rotationTimer = d3.timer(rotate)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number, number] = [...rotation]

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5
        const dx = moveEvent.clientX - startX
        const dy = moveEvent.clientY - startY
        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const zoomFactor = event.deltaY > 0 ? 0.95 : 1.05
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 2.5, projection.scale() * zoomFactor))
      projection.scale(newRadius)
      render()
    }

    // Touch handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (!event.touches[0]) return
      event.preventDefault() // Prevent scroll/refresh
      autoRotate = false
      const startX = event.touches[0].clientX
      const startY = event.touches[0].clientY
      const startRotation: [number, number, number] = [...rotation]

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!moveEvent.touches[0]) return
        moveEvent.preventDefault()
        const sensitivity = 0.5
        const dx = moveEvent.touches[0].clientX - startX
        const dy = moveEvent.touches[0].clientY - startY
        rotation[0] = startRotation[0] + dx * sensitivity
        rotation[1] = startRotation[1] - dy * sensitivity
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      }

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
        setTimeout(() => { autoRotate = true }, 10)
      }

      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("wheel", handleWheel)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })

    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("touchstart", handleTouchStart)
    }
  }, [width, height])

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">Error loading globe</p>
          <p className="text-zinc-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-zinc-500 text-sm">Loading globe...</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="rounded-2xl cursor-grab active:cursor-grabbing"
        style={{ maxWidth: "100%", height: "auto", touchAction: "none" }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-zinc-600 px-3 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800">
        <span className="hidden sm:inline">Drag to rotate • Scroll to zoom</span>
        <span className="sm:hidden">Touch to rotate</span>
      </div>
    </div>
  )
}
