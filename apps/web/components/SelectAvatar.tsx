import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from "react"
import type { Avatar } from "shared-utils"
import { useUser } from "~/contexts/UserContext"
import UserAvatar from "./UserAvatar"

const availableAvatars: Avatar[] = [
  "bee",
  "crab",
  "dog",
  "elephant",
  "fox",
  "frog",
  "koala",
  "octopus",
  "penguin",
  "turtle",
  "whale",
]

type Props = {
  onChange: (avatar: Avatar) => void
  containerClassName?: string
}

const SelectAvatar = ({ containerClassName, onChange }: Props) => {
  const { avatar } = useUser()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const userAvatar = availableAvatars.findIndex((a) => a === avatar)
    const newIndex =
      userAvatar !== -1
        ? userAvatar
        : Math.round(Math.random() * availableAvatars.length - 1)

    setIndex(newIndex)
    onChange(availableAvatars[newIndex])
  }, [])

  const handlePrevious = () => {
    const newIndex = index === 0 ? availableAvatars.length - 1 : index - 1
    setIndex(newIndex)

    onChange(availableAvatars[newIndex])
  }

  const handleNext = () => {
    const newIndex = index === availableAvatars.length - 1 ? 0 : index + 1
    setIndex(newIndex)

    onChange(availableAvatars[newIndex])
  }

  return (
    <div className={`flex flex-row gap-2 items-center ${containerClassName}`}>
      <ChevronLeftIcon
        className="h-6 w-6 cursor-pointer dark:text-primary"
        onClick={handlePrevious}
      />
      <div className="flex flex-col gap-2">
        <UserAvatar avatar={availableAvatars[index]} />
      </div>
      <ChevronRightIcon
        className="h-6 w-6 cursor-pointer dark:text-primary"
        onClick={handleNext}
      />
    </div>
  )
}

export default SelectAvatar
