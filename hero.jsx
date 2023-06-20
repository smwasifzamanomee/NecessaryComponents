import Link from "next/link"

const Hero = () => {
    return (
    <div style={{overflow: "hidden"}}>
            <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{ backgroundPosition: '50%', backgroundImage: `url('https://i2.wp.com/www.yasmintransport.com/wp-content/uploads/2018/05/Newark-airport-services.jpg?fit=1170%2C362&ssl=1')`, height: '500px' }}>
            {/* https://mdbootstrap.com/img/new/standard/city/025.jpg */}
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center text-white px-6 md:px-12">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-12">The best offer on the market <br /><span>for your business</span></h1>
                            <Link href="/registration">
                            <h1 className="inline-block px-7 py-3 mr-1.5 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Get started</h1></Link>
                            <Link href="/howtoReg">
                            <h1 className="inline-block px-7 py-3 border-2 border-transparent bg-transparent text-white font-medium text-sm leading-snug uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Learn more</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="-mt-2.5 md:-mt-4 lg:-mt-6 xl:-mt-10" style={{ height: '50px', transform: 'scale(2)', transformOrigin: 'top center', color: '#fff'}}>
                <svg viewBox="0 0 2880 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 48 L 1437.5 48 L 2880 48 L 2880 0 L 2160 0 C 1453.324 60.118 726.013 4.51 720 0 L 0 0 L 0 48 Z" fill="currentColor"></path>
                </svg>
            </div>



        </div>

    )
}

export default Hero
