import StacklineIcon from '@/assets/stackline_logo.svg';
export default function Header() {
  return (
    <div className="w-full h-24 bg-stackline p-3 flex items-center flex-start">
      { /* TODO: Cut to S and add bottom border */}
      <div className="h-full">
        <StacklineIcon id="logo" className="h-3/4 w-1/4 p-3 pb-0 pl-3 mb-0" height="100" viewBox="-30 110 470 120"/>
        <div className="h-1 w-9 mt-2 ml-2 bg-white"></div>
      </div>
    </div>
  );
}
