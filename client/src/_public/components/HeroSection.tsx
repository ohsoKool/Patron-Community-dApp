import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import BlurIn from '@/components/magicui/blur-in';
import NavBar from '@/_public/components/NavBar';
import Display from '@/_public/components/Display';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function HeroSection() {
  const [walletAddress, setWalletAddress] = useState<string>('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((response) => {
          if (Array.isArray(response) && response.length > 0) {
            setWalletAddress(response[0]);
          }
        })
        .catch((error: any) => {
          console.error('Error requesting Ethereum accounts:', error);
        });
    }
  }, []);

  const web3 = new Web3(window.ethereum);

  const signInWithEth = async () => {
    if (!walletAddress) {
      console.error('No wallet address found.');
      return;
    }

    try {
      const response = await axios.get(`${serverUrl}/nounce/get-nounce`, {
        params: { walletAddress },
      });

      const nonce = response.data.data.nounce;
      console.log('NONCE: ', nonce);

      if (typeof nonce !== 'string') {
        console.error('Nonce is not a string:', nonce);
        return;
      }

      try {
        const signedNonce = await web3.eth.personal.sign(
          nonce,
          walletAddress,
          '' // MetaMask will handle the signing
        );
        console.log('SIGNED NONCE: ', signedNonce);

        const response1 = await axios.get(`${serverUrl}/nounce/verify-nounce`, {
          params: { walletAddress, signedNonce },
        });

        console.log('VERIFIED RESPONSE: ', response1);
      } catch (error) {
        console.error('Error signing nonce:', error);
      }
    } catch (error) {
      console.error('Error fetching nonce:', error);
    }
  };

  return (
    <div className="bg-PATRON_BLACK z-10">
      <NavBar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#2afff8b5] to-[#c919ff70] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] custom-fade-in"
          />
        </div>
        <div className="flex flex-col w-full my-5">
          <BlurIn
            duration={1}
            className="text-4xl md:text-6xl lg:w-4/5 mx-auto font-fira-code w-full text-center font-bold bg-gradient-to-br from-white to-neutral-700 bg-clip-text text-transparent"
            word="BUILD YOUR COMMUNITIES, SHARE YOUR PASSIONS AND CONNECT"
          />
          <p className="w-full mt-7 text-center text-sm sm:text-xl sm:w-2/3 mx-auto">
            It's a platform designed to foster meaningful connections and spark discussions within
            groups focused on shared passions.
          </p>
          <Button className="cursor-pointer h-7 md:h-9 bg-PATRON_TEXT_WHITE_SECONDARY hover:bg-PATRON_TEXT_WHITE_PRIMARY mt-4 md:mt-8 mx-auto text-black">
            {'Make Community'}

            <MoveRight className="h-4 ml-2" />
          </Button>
          <Button onClick={signInWithEth}>Hello</Button>
        </div>
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 fade-in-gradient top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#19ff75] to-[#e9ff1f] sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] opacity-30 custom-fade-in"
          />
        </div> */}
      </div>
      <Display />
    </div>
  );
}
