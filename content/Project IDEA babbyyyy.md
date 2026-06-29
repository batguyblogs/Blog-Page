---
title:
draft: true
tags:
comments: true
---
# Project Inspiration Document: Software-Defined Chassis Dynamics (SDCD)
**Author:** Engineering Research Collaboration (askbatguy & Gemini)
**Date:** March 2026
**Theme:** The Convergence of Steer-by-Wire (SbW) and Independent Hub-Motor Propulsion.

---

## Executive Summary
This document outlines a theoretical framework for a vehicle chassis that treats steering geometry and wheel torque as dynamic software parameters rather than static mechanical constraints. By combining **Steer-by-Wire (SbW)** with **In-Wheel Motors (IWM)**, a vehicle can transition between Ackermann, Parallel, and Anti-Ackermann geometries in real-time to optimize for tire wear, high-speed stability, or maximum lateral grip.

---

## Phase I: Variable Steering Geometry Logic

### The Original Pitch
> "hey im studying about steering mechanisms and i just learnt about ackermann , parallel and anti - ackermann steering. and i thought since drive by wire is becoming more and more mainstream, couldnt independent steering control for each tire make it possible to choose between the different steering geometry, depending on the speed and load characteristics ?"

### Detailed Technical Breakdown
In a traditional mechanical system, the "Ackermann Percentage" is baked into the geometry of the steering knuckles. In a Software-Defined Chassis, the steering angle $\delta$ for each wheel is independent.

#### 1. Low-Speed: Pure Ackermann ($100\%$)
* **Physics:** All wheels trace concentric circles around a single center point.
* **Geometry:** The inner wheel angle ($\delta_i$) is significantly greater than the outer wheel angle ($\delta_o$).
* **The Benefit:** Eliminates "tire scrub" (sideways dragging), reduces turning radius, and minimizes low-speed steering effort.


#### 2. High-Speed: Parallel Steering ($0\%$ Ackermann)
* **Physics:** As speed increases, the turning radius becomes massive, and the difference in path between the inner and outer tires becomes negligible.
* **Geometry:** $\delta_i \approx \delta_o$.
* **The Benefit:** Improved directional stability and more consistent tire heating across the tread during lane changes.

#### 3. High-Performance: Anti-Ackermann (Negative Ackermann)
* **Physics:** In high-G cornering, the outer tire carries the majority of the vehicle's weight (Normal Force $F_z$). To generate maximum lateral force, the outer tire often requires a higher slip angle ($\alpha$) than the inner tire.
* **Geometry:** $\delta_o > \delta_i$.
* **The Benefit:** Maximizes the "Contact Patch" efficiency of the outer tire, allowing for higher cornering speeds in racing applications.

---

## Phase II: The Synergy of Independent Propulsion

### The Original Pitch
> "woah wait also what about the motors themselves, evs often have hub motors so the problem of wheels having different velocites is not actually much of a problem. what if you could combine this variable steering geometry idea with the motor speed control as well ?"

### Detailed Technical Breakdown
Integrating **In-Wheel Motors (IWM)** with SbW creates a "Corner Module" where velocity and angle are perfectly synced.

#### 1. The Electronic Differential
In any turn, the inner wheel travels a shorter distance than the outer wheel.
* **The Logic:** The central controller calculates the required velocity ($\omega$) for each wheel based on the instantaneous steering geometry.
* **The Synergy:** By matching the motor RPM to the exact arc defined by the SbW system, parasitic drag is nearly eliminated, increasing the overall powertrain efficiency of the EV.

#### 2. Active Yaw Moment (Torque Vectoring)
* **The Logic:** Beyond just matching speed, the motors can *induce* rotation. To initiate a turn, the system can apply positive torque to the outer rear wheel and regenerative braking to the inner front wheel.
* **The Synergy:** This reduces the "Work" the steering actuators have to do, allowing for faster turn-in and "Go-Kart" like handling in heavy consumer vehicles.

#### 3. Non-Standard Maneuvers
* **Crab Walking:** All four wheels steer to the same angle (e.g., $45^\circ$) while motors maintain identical speeds.
* **Tank Turns:** Front and rear wheels steer inward (toes-in) or outward (toes-out), with left and right motors spinning in opposite directions.


---

## Phase III: Future Research & "Back-Pitches"

### Research Path A: The "Slip-Angle" Estimator
**Concept:** Move away from "Lookup Tables" and toward "Active Estimation."
* **Objective:** Use IMU (Inertial Measurement Unit) and wheel-speed sensors to estimate the real-time slip angle $\alpha$. 
* **Goal:** Create a feedback loop where the steering geometry *self-adjusts* mid-corner to prevent understeer by moving from Ackermann toward Anti-Ackermann as front-end grip reaches its limit.

### Research Path B: Unsprung Mass & Suspension Kinematics
**Concept:** Addressing the "Engineering Trade-off."
* **Objective:** Hub motors and steering actuators add significant mass to the wheel assembly (unsprung mass), which degrades ride quality.
* **Goal:** Research "Virtual Kingpin" suspension geometries that allow independent steering movement while keeping the heavy motor components closer to the chassis.

### Research Path C: Fail-Operational Architecture
**Concept:** Ensuring safety in a "Wire-Only" world.
* **Objective:** Develop a control law for when a single steering actuator fails.
* **Goal:** If the front-left steering motor locks, can the other three wheels and four hub motors use torque vectoring and rear-wheel steering to safely guide the vehicle to a stop?

---

## Engineering Comparison Matrix

| Feature | Standard Mechanical | Independent SbW + IWM |
| :--- | :--- | :--- |
| **Geometry Control** | Static (Linkage-based) | Dynamic (Software-defined) |
| **Differential** | Passive (Mechanical) | Active (Electronic/Calculated) |
| **Tire Wear** | High in tight turns | Minimal (Sync'd Velocity/Angle) |
| **Cornering Limit** | Defined by Suspension Kinematics | Defined by Real-time Slip Optimization |
| **Fail-Safe** | Mechanical Column | Redundant Electronic Loops |

---
**"The goal isn't just to steer the car; it's to mathematically optimize the path of every individual tire contact patch in real-time."**

--- 
## Appendix: Prototype Validation via Scaled RC Platform
**Project Name:** "Micro-SDC" (Micro Software-Defined Chassis)
**Scale:** 1:10 or 1:8 Electric Platform

---

### 1. Hardware Stack (The "Corner Module" Prototype)
To achieve the goals of the pitch, the RC car must move away from a single steering servo and a center-drive motor toward a distributed control architecture.

* **Steering:** Dual high-torque digital servos (one per front steering knuckle). This allows the software to command independent angles ($\delta_i$ and $\delta_o$) without a mechanical tie-rod limitation.
* **Propulsion:** Dual or Quad Brushless DC (BLDC) motors. For a true "Hub Motor" simulation, use **outrunner motors** mounted directly to the uprights, or independent "inboard" motors with short half-shafts.
* **Brain:** **Teensy 4.1** or **Raspberry Pi Pico 2**. These microcontrollers offer the high-speed PWM and Floating Point Unit (FPU) processing power required for real-time kinematic calculations.
* **Sensing:** A 6-axis IMU (e.g., MPU-6050) to measure actual yaw rate vs. commanded yaw rate, allowing the system to detect understeer in real-time.

---

### 2. The "Demonstration Modes" (Firmware Profiles)
The project should feature a "Mode Selector" (via a physical switch or transmitter toggle) to demonstrate the physical effects of different geometries.

#### **Mode A: "The Classic" (Fixed Mechanical Simulation)**
* **Logic:** The code mimics a physical tie-rod. The inner and outer wheels are locked to a $100\%$ Ackermann ratio regardless of speed. 
* **Observation:** Highlighting tire "chirp" or understeer when trying to take a high-speed corner, as the inner wheel is turned too sharply for the lateral load.

#### **Mode B: "The Highway Star" (Dynamic Geometry)**
* **Logic:** As the throttle input increases, the controller gradually shifts the steering ratio from **Ackermann** (for low-speed agility) to **Parallel** (for high-speed stability). 
* **Observation:** The car feels less "twitchy" at high speeds and exhibits more stable, predictable lane-change characteristics.


#### **Mode C: "The Apex Predator" (Anti-Ackermann + Torque Vectoring)**
* **Logic:** When the IMU detects high lateral G-forces, the outer wheel steers *deeper* into the turn (Anti-Ackermann). Simultaneously, the outer motor receives a torque boost while the inner motor applies light regenerative braking.
* **Observation:** The car "pivots" aggressively, allowing for tighter cornering at speed than the physical steering angle alone would allow.

#### **Mode D: "The Ghost Move" (Crab & Tank)**
* **Logic:** Utilizing full $90^\circ$ independent steering capability.
* **Observation:** Demonstrating the car moving perfectly laterally (Crab Walk) and rotating $360^\circ$ on its center axis (Tank Turn).


---

### 3. Proposed Control Logic (Pseudocode)
This snippet demonstrates how the system transitions from Ackermann to Parallel geometry based on the vehicle's current velocity.

```cpp
// Simplified Logic for Mode B (Variable Geometry Transition)
void calculateSteering(float steeringInput, float velocity) {
    // Transition factor 'k': 1.0 (Low Speed / Ackermann) to 0.0 (High Speed / Parallel)
    float k = map(velocity, 0, 100, 1.0, 0.0); 
    
    // We adjust the 'virtual track width' based on our factor 'k'
    // L = Wheelbase, W = Actual Track Width
    float virtual_w = actual_w * k;

    // Calculate independent angles for inner and outer wheels
    // Based on the radius (R) derived from the steeringInput
    float delta_inner = atan(L / (R - (virtual_w / 2)));
    float delta_outer = atan(L / (R + (virtual_w / 2)));

    // Update Servos
    servoInner.write(delta_inner);
    servoOuter.write(delta_outer);
}
```

