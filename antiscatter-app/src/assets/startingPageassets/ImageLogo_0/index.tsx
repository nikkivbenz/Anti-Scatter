// Defining a React functional component named ImageLogo
export const ImageLogo = () => {
  return (
    // This component renders an SVG element representing a logo
    <svg
      style={{
        transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
        transformOrigin: "1px 1px",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width="298"
      height="234"
      viewBox="0 0 298 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Defining a pattern to fill the SVG */}
      <defs>
        <pattern
          id="fcb99ce0d53a98ec5ff4c4c40528ea6af5d7f7c0"
          patternUnits="userSpaceOnUse"
          width="298"
          height="234"
        >
          {/* Including an image in the pattern */}
          <image
            href="https://s3-alpha-sig.figma.com/img/fcb9/9ce0/d53a98ec5ff4c4c40528ea6af5d7f7c0?Expires=1697414400&Signature=prU84ytEYfO4zfMCRmYCeSaCWs4v63A1iY3fDBtAZg0Xo-wdlcJQxbNEbzqsK1iRvoe6ggKbbJuE5kVcci33GCAvK7xEV6la-YFZMevaGVfmfaMKwuU59Fza3KTN-3qQMCh3aqzheG8XNYaMm4iqZVmqmzypya6x6DlxCt-xEX8kvQhNZMNc7Ml6csQfoHHT4MX2wEUZUvJDkmWYsCUWyLv6gCzriporZUlNr2OzULkZzriykh4G-fB~JMAk38kIqIchhthKtZ5ypFExF3miihWXCEoPZt9qvBLHw-GMkWBAGST0Qvo47JTzD2mnieRZxEy-BhL-X7M8shm5rDnSEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            x="0"
            y="0"
            width="100%"
          />
        </pattern>
      </defs>
      {/* Drawing a path (shape) using the pattern as fill */}
      <path
        d="M290 0L8 0C3.58172 0 0 3.58172 0 8L0 226C0 230.418 3.58172 234 8 234L290 234C294.418 234 298 230.418 298 226L298 8C298 3.58172 294.418 0 290 0Z"
        fill="url(#fcb99ce0d53a98ec5ff4c4c40528ea6af5d7f7c0)" // Fill the path with the defined pattern
      />
    </svg>
  );
};
