{
  description = "Dev environment for vadirn.io";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_23
          pkgs.corepack_23
        ];
        shellHook = ''
          export COREPACK_ENABLE_STRICT=0
          export PNPM_HOME="$HOME/.local/share/pnpm"
          export PATH="$PNPM_HOME:$PATH"
          pnpm add -g vercel
        '';
      };
    });
}
