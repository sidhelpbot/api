{ pkgs }: {
    deps = [
        pkgs.yarn
        pkgs.nodejs-18_x
        pkgs.chromedriver
        pkgs.chromium
        pkgs.glib
        pkgs.nss
        pkgs.fontconfig
        pkgs.nodejs
        pkgs.nixos-rebuild
        pkgs.esbuild
        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
    nativeBuildInputs = [
        pkgs.chromedriver
    ];
}
