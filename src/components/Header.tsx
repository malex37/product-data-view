import StacklineIcon from '@/assets/stackline_logo.svg';
export default function Header() {
  return (
    <div className="w-full h-24 bg-stackline p-3">
      { /* TODO: Cut to S and add bottom border */}
      <StacklineIcon className="h-3/4" />
    </div>
  );
}
