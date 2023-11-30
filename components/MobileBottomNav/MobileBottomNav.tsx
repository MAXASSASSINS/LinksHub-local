import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import QuestionMarkIcon from 'assets/icons/svg/question-mark.svg'
import HomeInActiveIcon from 'assets/icons/svg/nav/home-inactive.svg'
import HomeActiveIcon from 'assets/icons/svg/nav/home-active.svg'
import SaveInActiveIcon from 'assets/icons/svg/nav/save-inactive.svg'
import SaveActiveIcon from 'assets/icons/svg/nav/save-active.svg'
import TeamInActiveIcon from 'assets/icons/svg/nav/team-inactive.svg'
import TeamActiveIcon from 'assets/icons/svg/nav/team-active.svg'
import SearchAciveIcon from 'assets/icons/svg/nav/search-active.svg'
import SearchInAciveIcon from 'assets/icons/svg/nav/search-inactive.svg'

const MobileBottomNav: FC = () => {
  const router = useRouter()

  const inActiveIconCls = 'stroke-gray-400'
  const activeIconCls = 'fill-primary dark:fill-white'

  const navLinks = [
    {
      inActiveIcon: <HomeInActiveIcon className={inActiveIconCls} />,
      activeIcon: <HomeActiveIcon className={activeIconCls} />,
      label: 'Home',
      href: '/',
      spaceActive: true,
    },
    {
      inActiveIcon: <SaveInActiveIcon className={inActiveIconCls} />,
      activeIcon: <SaveActiveIcon className={activeIconCls} />,
      label: 'Saved',
      href: '/saved',
    },
    {
      inActiveIcon: <SearchInAciveIcon className={inActiveIconCls} />,
      activeIcon: <SearchAciveIcon className={activeIconCls} />,
      label: 'Search',
    },
    {
      inActiveIcon: <TeamInActiveIcon className={inActiveIconCls} />,
      activeIcon: <TeamActiveIcon className={activeIconCls} />,
      label: 'Our Team',
      href: '/contributors',
    },
  ]

  const renderLinks = () =>
    navLinks.map(({ inActiveIcon, activeIcon, label, href }, i) => {
      const checkRoute = (val: string) => router.asPath.startsWith(val)

      const isHomeActive = !checkRoute('/saved') && !checkRoute('/contributors')
      const isUrlMatched = href && checkRoute(href)
      const isActive = label === 'Home' ? isHomeActive : isUrlMatched

      return (
        <li key={i} className="list-none">
          {href ? (
            <Link
              href={href}
              className={`w-full flex flex-col px-4 p-3 gap-2 font-medium  rounded-xl hover:bg-slate-100 hover:bg-opacity-50 dark:hover:bg-zinc-400 dark:hover:bg-opacity-10 ${
                isActive ? 'text-primary dark:text-white' : 'text-gray-400'
              }`}
            >
              <span className="flex items-center justify-center">
                {isActive ? activeIcon : inActiveIcon}
              </span>
              <span className="text-xs">{label}</span>
            </Link>
          ) : (
            <div
              className={`w-full flex flex-col px-4 p-3 gap-2 font-medium rounded-xl hover:bg-slate-100 hover:bg-opacity-50 dark:hover:bg-zinc-400 dark:hover:bg-opacity-10 ${
                isActive ? 'text-primary dark:text-white' : 'text-gray-400'
              }`}
            >
              <span className="flex items-center justify-center">
                {inActiveIcon}
              </span>
              <span className="text-xs">{label}</span>
            </div>
          )}
        </li>
      )
    })

  return (
    <div className="sm:hidden -ml-4 fixed z-30 bottom-0 py-2 w-full flex gap-4 justify-evenly bg-white dark:bg-slate-800">
      {renderLinks()}
    </div>
  )
}

export default MobileBottomNav