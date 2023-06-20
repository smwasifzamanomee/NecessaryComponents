import React, { useState } from "react";
import { QuestionsData } from "../../../data/data";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styles from '../../../styles/Faq.module.css';

const FAQ = () => {

    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }



    return (
        <section className={`md:flex justify-between py-12 `} >
            <div className="mt-12">
            <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">Frequently  asked questions</h1>

                    <p className="max-w-2xl mx-auto mt-4 text-gray-500">
                    FAQs are often used in customer support and are an efficient way to provide basic information to a large number of people.
                    </p>
                </div>
            </div>

            <div className="md:w-[600px] grid col-span-1 gap-y-6 py-8">
                {QuestionsData.map((item) => (
                    <article key={item.id} className="shadow-shadow_white p-4">
                        {/* Title */}
                        <div
                            className="flex items-center justify-between h-10 cursor-pointer"
                            onClick={() => toggle(item.id)}
                        >
                            <h2 className="font-semibold md:text-lg sm:text-md text-lg"> <span className="mr-4 text-light">{item.id}</span> {item.question}</h2>
                            {selected === item.id ? <AiOutlineMinus /> : <AiOutlinePlus />}
                        </div>
                        {/* Content */}
                        <p className={`${selected === item.id ? `${styles.content} ${styles.show} mt-8 px-8` : `${styles.content}`} text-gray-600 text-sm text-justify`}>{item.answer}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
