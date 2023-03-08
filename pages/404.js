import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./layout/main";

export default function FourZeroFour() {
    const router = useRouter();
    return (<>
        <>
            <section style={{ background: 'var( --rich-black-fogra-29)', height: '100vh' }} className='max-h-screen h-auto flex items-center'>
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-sm text-center">
                        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-info">404</h1>
                        <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl dark:text-white">Something's missing.</p>
                        <p class="mb-4 text-lg font-light text-white dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                        <div className=" flex w-100 justify-center">
                            <Button shadow bordered color="primary" auto onPress={() => {
                                router.push('/');
                            }}>
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    </>)
}