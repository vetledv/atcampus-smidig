import Menu from 'components/Menu';

const AppLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="h-full flex flex-row">
                <div className="w-64 relative">
                    <Menu />
                </div>
                {children}
            </div>
        </div>
    );
};

export default AppLayout;
