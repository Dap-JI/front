type IconPropsType = {
  width?: string;
  height?: string;
  fill?: string;
  onClick?: any;
  className?: string;
};

const IconTemplate = ({
  width = '24',
  height = '24',
  fill = 'white',
  onClick,
  className,
  children,
}: IconPropsType & { children: React.ReactNode }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={fill}
      onClick={onClick}
      className={className}
    >
      {children}
    </svg>
  );
};

export const GoogleIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </IconTemplate>
  );
};

export const KakaoIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <g id="Icon/Kakaotalk">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C4.58478 2 1 6.48339 1 10.2764C1 13.1185 2.90422 15.6254 5.80456 17.1151L4.58478 21.4564C4.476 21.8413 4.927 22.1468 5.27289 21.9254L10.6226 18.4853C11.0736 18.5279 11.5331 18.5528 12 18.5528C18.0744 18.5528 23 14.8474 23 10.2764C23 6.48339 19 2 12 2Z"
          fill="black"
        />
      </g>
    </IconTemplate>
  );
};

export const NaverIcon = ({ ...props }: IconPropsType) => {
  return (
    <IconTemplate {...props}>
      <circle cx="10" cy="10" r="10" fill="#03C75A" />
      <path
        d="M11.35 10.25L8.50002 6.19995H6.15002V13.8H8.65002V9.74995L11.5 13.8H13.85V6.19995H11.35V10.25Z"
        fill="white"
      />
    </IconTemplate>
  );
};
