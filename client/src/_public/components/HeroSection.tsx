import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import BlurIn from '@/components/magicui/blur-in';
import NavBar from '@/_public/components/NavBar';
import Display from '@/_public/components/Display';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { getItemWithExpiry, setItemWithExpiry } from '@/lib/localStorage';
import { useNavigate } from 'react-router-dom';
import useWalletStore from '@/lib/zustand/WalletStore';
import { hexlify } from 'ethers';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const ONE_DAY = 24 * 60 * 60 * 1000; // One day in milliseconds
// const ONE_WEEK = 7 * ONE_DAY; // One week in milliseconds

export default function HeroSection() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const navigate = useNavigate();
  const { setWalletAddress: setGlobalWalletAddress } = useWalletStore();

  useEffect(() => {
    const storedWalletAddress = getItemWithExpiry('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setGlobalWalletAddress(storedWalletAddress);
    }
  }, []);

  const web3 = new Web3(window.ethereum);

  const signInWithEth = async () => {
    if (walletAddress) {
      navigate('/all-groups');
      return;
    } else {
      // GETTING WALLET ADDRESS

      if (window.ethereum) {
        console.log('THIS BLOCK EXECUTED');
        await window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((response) => {
            if (Array.isArray(response) && response.length > 0) {
              console.log('FETCHING WALLET ADDRESS: ', response[0]);
              setWalletAddress(response[0]);
              console.log('STATE WALLET ADDRES: ', walletAddress);
              setItemWithExpiry('walletAddress', response[0], ONE_DAY);
              console.log('LOCAL WALLET ADDRESS:', localStorage.getItem('walletAddress'));
            }
          })
          .catch((error: any) => {
            console.error('Error requesting Ethereum accounts:', error);
          });
      }

      if (!localStorage.getItem('walletAddress')) {
        console.error('No wallet address found.');
        return;
      }

      //CREATING AND VERIFYING NOUNCE
      try {
        const localStorageObject = JSON.parse(localStorage.getItem('walletAddress')!);
        const { value } = localStorageObject;
        console.log('LOCAL STORAGE OBJECT VALUE:  ', value);
        const checkResponse = await axios.get(`${serverUrl}/nounce/check-walletAddress-exists`, {
          params: { walletAddress: value },
        });

        console.log('CHECK RESPONSE: ', checkResponse.data.data.message);

        let nounce: String;

        if (!checkResponse.data.data.message) {
          const createResponse = await axios.get(`${serverUrl}/nounce/create-nounce`, {
            params: { walletAddress: value },
          });

          if (createResponse.data.data.nounce) {
            console.log('CREATE RESPONSE: ', createResponse.data.data.nounce);
            nounce = createResponse.data.data.nounce;
          }
        } else {
          const GetResponse = await axios.get(`${serverUrl}/nounce/get-nounce`, {
            params: { walletAddress: value },
          });

          if (GetResponse.data.data.nounce) {
            console.log('GET RESPONSE: ', GetResponse.data.data.nounce);
            nounce = GetResponse.data.data.nounce;
          }
        }

        console.log('NONCE: ', nounce!);

        if (typeof nounce! !== 'string') {
          console.error('Nonce is not a string:', nounce!);
          return;
        }

        console.log('SIGNING NOUNCE');

        const bytes = new TextEncoder().encode(nounce);

        console.log('HEXSTRING: ', bytes);

        const signedNounce = await web3.eth.personal.sign(hexlify(bytes), value, '');

        console.log('SIGNED NONCE: ', signedNounce);

        const verifiedResponse = await axios.get(`${serverUrl}/nounce/verify-nounce`, {
          params: { walletAddress: value, signedNounce },
        });

        console.log('VERIFIED RESPONSE: ', verifiedResponse.data.data.message);

        if (verifiedResponse.data.data.message) {
          setGlobalWalletAddress(value);
          navigate('/all-groups');
        } else {
          alert('SOMETHING WENT WRONG');
        }
      } catch (error) {
        console.error('Error fetching nonce:', error);
      }
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
          <Button
            onClick={signInWithEth}
            className="cursor-pointer h-7 md:h-9 bg-PATRON_TEXT_WHITE_SECONDARY hover:bg-PATRON_TEXT_WHITE_PRIMARY mt-4 md:mt-8 mx-auto text-black"
          >
            {walletAddress ? 'Make Community' : 'Connect wallet'}

            <MoveRight className="h-4 ml-2" />
          </Button>
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
