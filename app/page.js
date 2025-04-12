import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col items-center gap-4 text-white h-[44vh]">
      <div className="font-bold text-5xl flex gap-2 justify-center items-center ">Buy Me a Chai <span><img className="invert" src="tea.gif" alt="" width={88}/></span></div>
      <p>
        A crowdfunding platform for creatores. Get funded by your fans and followeres. Start now!
      </p>
      <div>
      <Link href={"/login"}>
      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
      </Link>
      <Link href={"/about"}>
      <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
      </Link>
      </div>
    </div>
      <div className="bg-white  h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-20">
        <h2 className="text-2xl font-bold text-center mb-14">Your Fans can buy a chai</h2>
        <div className="flex gap-5 justify-around">
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/man.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/coin.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/group.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        </div>
      </div>
      <div className="bg-white  h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-20">
        <h2 className="text-2xl font-bold text-center mb-14">Learn More About Us</h2>
        <div className="flex gap-5 justify-around">
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/man.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/coin.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-2 text-black " src="/group.gif" alt="" width={88}/>
        <p className="font-bold">Fond Yourself</p>
        <p className="text-center">Your fans are available for you to help you</p>
        </div>
        </div>
      </div>
    </>

  );
}
