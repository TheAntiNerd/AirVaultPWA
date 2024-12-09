'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Down } from '../svgs'


const people = [
    { id: 1, name: '1 hour' },
    { id: 2, name: '6 hours' },
    { id: 3, name: '12 hours' },
    { id: 4, name: '1 day' },
    { id: 5, name: '3 days' },
    { id: 6, name: '1 week' },
]

export default function FrequencySelect() {
    const [selected, setSelected] = useState(people[3])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-[#44475B] text-base font-medium">Frequency</Label>
            <div className="relative mt-3">
                <ListboxButton className="relative w-full cursor-default bg-white text-[#44475B] focus:border-[#298DFF] pr-10 text-left border rounded-[8px] px-6 py-4  border-[#C4C7E3] ring-0 ring-inset ring-[#C4C7E3] focus:outline-none text-[16px] sm:leading-6">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-[24px] flex items-center ">
                        <Down aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    anchor={{ to: 'bottom', gap: '4px' }}
                
                    className="absolute z-10  max-h-60 !max-w-[600px] w-full overflow-auto px-3 rounded-[8px] bg-white py-3 text-base border border-[#C4C7E3] ring-0 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {people.map((person) => (
                        <ListboxOption
                            key={person.id}
                            value={person}
                            className="group relative cursor-default select-none py-[5px] px-3 rounded-[4px] text-[#44475B] data-[focus]:bg-[#298DFF] data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.name}</span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
