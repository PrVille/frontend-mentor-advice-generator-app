import { useState } from "react"
import axios from "axios"

import Footer from "./components/Footer"

import iconDice from "../images/icon-dice.svg"
import patternDividerDesktop from "../images/pattern-divider-desktop.svg"

interface Advice {
  id: number
  advice: string
}

const defaultAdvice: Advice = {
  id: 117,
  advice:
    "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
}

const errorAdvice: Advice = {
  id: -1,
  advice: "Failed to fetch new advice. Try again later.",
}

const App = () => {
  const [adviceSlip, setAdviceSlip] = useState<Advice>(defaultAdvice)
  const [loading, setLoading] = useState<boolean>(false)

  const updateAdvice = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("https://api.adviceslip.com/advice")
      setAdviceSlip(data.slip)
    } catch (error) {
      console.log(error)
      setAdviceSlip(errorAdvice)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="h-screen flex items-center justify-center font-manrope bg-darkBlue">
        <div className="bg-darkGrayishBlue inline-flex flex-col items-center rounded-2xl relative p-8 m-4 max-w-[540px]">
          <h1 className="mt-4 uppercase text-neonGreen tracking-[0.2em] text-xs">
            Advice #{adviceSlip.id}
          </h1>
          <p className="mt-6 text-2xl sm:text-[28px]/[42px] text-lightCyan text-center">
            "{adviceSlip.advice}"
          </p>
          <img className="mt-6 sm:mt-8 mb-8 select-none" src={patternDividerDesktop} />
          <button
            className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-neonGreen rounded-full p-5 hover:shadow-[0px_0px_30px_0px] hover:shadow-neonGreen"
            onClick={updateAdvice}
          >
            <img className={loading ? "animate-spin" : ""} src={iconDice} />
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
