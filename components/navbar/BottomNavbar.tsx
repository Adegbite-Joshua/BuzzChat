import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { CallOutlined, EmailOutlined, GroupsOutlined, SettingsOutlined } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

export default function BottomNavbar({isMediumSize}:{isMediumSize: boolean}) {
    const activePath = usePathname();
    const [value, setValue] = React.useState(activePath.split('/')[1] || 'messages');
    React.useEffect(() => {
        setValue(activePath.split('/')[1]);
    }, [activePath])


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const navbarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (navbarRef.current) {
            navbarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!isMediumSize) {
        return <></>;
    }

    return (
        <>
            <BottomNavigation className='w-full h-[10%] md:h-0 md:hidden border-t border-slate-200' value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Messages"
                    value="messages"
                    icon={<EmailOutlined />}
                />
                <BottomNavigationAction
                    label="Groups"
                    value="groups"
                    icon={<GroupsOutlined />}
                />
                <BottomNavigationAction
                    label="Calls"
                    value="calls"
                    icon={<CallOutlined />}
                />
                <BottomNavigationAction
                    label="Settings"
                    value="settings"
                    icon={<SettingsOutlined />}
                />
                <span ref={navbarRef} className="h-0"></span>
            </BottomNavigation>
        </>
    );
}
