// https://tailwindui.com/components/application-ui/forms/select-menus

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface Forum {
    id: number;
    name: string;
    icon: string;
}

interface Props {
    forums: Forum[];
    selectedForum: Forum;
    setSelectedForum: (forum: Forum) => void;
}

export default function SelectForumMenu({
    forums,
    selectedForum,
    setSelectedForum,
}: Props) {
    const handleChange = (e: any) => {
        setSelectedForum(e);
    };

    return (
        <Listbox value={selectedForum} onChange={handleChange}>
            {({ open }) => (
                <>
                    <Listbox.Button className="relative w-full bg-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 text-gray-700 focus:ring-blue-400 focus:border-blue-400 sm:text-sm ">
                        <span className="flex items-center">
                            <img
                                src={selectedForum.icon}
                                alt=""
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                            />
                            <span className="ml-3 block truncate">
                                {selectedForum.name} 社区
                            </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute w-11/12 z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm md:w-1/3 ">
                            {forums.map((forum) => (
                                <Listbox.Option
                                    key={forum.id}
                                    className={({ active }) =>
                                        classNames(
                                            active
                                                ? "text-white bg-blue-200"
                                                : "text-gray-800",
                                            "cursor-default select-none relative py-2 pl-3 pr-9"
                                        )
                                    }
                                    value={forum}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                <img
                                                    src={forum.icon}
                                                    alt=""
                                                    className="flex-shrink-0 h-6 w-6 rounded-full"
                                                />
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "ml-3 block truncate text-gray-800"
                                                    )}
                                                >
                                                    {forum.name}
                                                </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active
                                                            ? "text-white"
                                                            : "text-blue-600",
                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </>
            )}
        </Listbox>
    );
}
