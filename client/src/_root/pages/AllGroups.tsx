import NavBar from '@/components/shared/NavBar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getRandomNumber } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GroupGrid from '@/components/root/GroupGrid';

const AllGroups = () => {
  const { pathname } = useLocation();
  const [randomNumber, setRandomNumber] = useState(0);
  const [pathList, setPathList] = useState<String[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const number = getRandomNumber(0, colors.length - 1);
    setRandomNumber(number);
    const pathSegments = pathname.split('/');
    setPathList(pathSegments);
  }, []);

  const colors = [
    'text-PATRON_CYAN',
    'text-PATRON_GREEN',
    'text-PATRON_PURPLE',
    'text-PATRON_YELLOW',
  ];

  const menuObject = [
    {
      label: 'Communtiy',
      color: colors[randomNumber],
    },
    {
      label: 'Popular',
      color: colors[(Number(randomNumber) + 1) % colors.length],
    },
    {
      label: 'Newest',
      color: colors[(Number(randomNumber) + 2) % colors.length],
    },
  ];

  const tagObject = [
    {
      label: 'Programming',
      color: colors[randomNumber],
    },
    {
      label: 'Photography',
      color: colors[(Number(randomNumber) + 3) % colors.length],
    },
    {
      label: 'Weekly Hot',
      color: colors[(Number(randomNumber) + 1) % colors.length],
    },
    {
      label: 'Anime',
      color: colors[(Number(randomNumber) + 2) % colors.length],
    },
  ];

  return (
    <section className="w-full md:h-screen">
      <div className="">
        <NavBar showAddress />
      </div>
      <main className="flex h-full flex-col md:flex-row w-full justify-center items-center">
        <div className="w-full h-full md:w-2/12 md:border-r md:border-r-PATRON_BORDER_COLOR">
          <li className="list-none">
            <div className="flex justify-between pr-10 border-b border-b-PATRON_BORDER_COLOR py-2 pt-3 px-5">
              <h1 className="text-lg">MENU</h1>
              <Button
                onClick={() => navigate('/create-group')}
                className="h-7 text-sm text-rose-400 md:hidden"
              >
                Create
              </Button>
            </div>
            <div className="flex flex-row md:flex-col justify-start items-center md:justify-center md:items-start gap-3 px-4 py-3 md:py-7 border-b border-b-PATRON_BORDER_COLOR">
              {menuObject.map((each) => (
                <Badge key={each.label} className={`${each.color} cursor-pointer md:w-32 md:h-7`}>
                  {each.label}
                </Badge>
              ))}
            </div>
          </li>
          <li className="list-none hidden md:block">
            <div className="border-b border-b-PATRON_BORDER_COLOR py-2 pt-3 px-5">
              <h1 className="text-lg">TAGS</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-start items-center gap-3 px-4 py-3 border-b border-b-PATRON_BORDER_COLOR md:py-7">
              {tagObject.map((each) => (
                <Badge key={each.label} className={`${each.color} cursor-pointer h-7`}>
                  {each.label}
                </Badge>
              ))}
            </div>
          </li>
          <li className="list-none hidden md:block">
            <div className="border-b border-b-PATRON_BORDER_COLOR py-2 pt-3 px-5">
              <h1 className="text-lg text-PATRON_TEXT_WHITE_PRIMARY">CREATE A COMMUTIY</h1>
            </div>
            <div className="pb-10 py-3 flex flex-row flex-wrap justify-start items-center gap-3 px-4 border-b border-b-PATRON_BORDER_COLOR">
              <p className="text-xs">Have ideas in mind ? Want to create your community?</p>
              <Button
                onClick={() => navigate('/create-group')}
                className="h-7 text-sm text-rose-400"
              >
                Create
              </Button>
            </div>
          </li>
        </div>
        <div className="w-full h-full md:w-10/12 md:px-10">
          <div className="flex w-full sm:w-5/6 md:w-4/5 lg:w-7/12 pr-10 border-b items-center gap-10 border-b-PATRON_BORDER_COLOR pt-4 pb-1">
            <h1 className="text-md sm:text-lg ml-5 text-white">All Groups</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-xs md:text-sm" href="/">
                    Landing Page
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pathList.map((each) => (
                  <BreadcrumbItem key={each.length}>
                    <BreadcrumbLink
                      className={colors[randomNumber] + ' text-xs md:text-sm'}
                      href={`/${each}`}
                    >
                      {each}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                ))}
                <BreadcrumbSeparator />
                <BreadcrumbItem>.....</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="h-5/6 px-10 md:px-0">
            <GroupGrid />
          </div>
        </div>
      </main>
    </section>
  );
};

export default AllGroups;
