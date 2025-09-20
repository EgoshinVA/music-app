import { NavLink } from 'react-router';
import s from './header.module.scss';
import { FC } from 'react';
import { navItems } from '@/widgets/header/lib/nav-items';

export const Header: FC = () => {
  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
