# Deepgram Voicebot

[![Discord](https://dcbadge.vercel.app/api/server/xWRaCDBtW4?style=flat)](https://discord.gg/xWRaCDBtW4)

A demo is live at https://deepgram.com/agent

Table of contents:

- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)

## Getting an API Key

🔑 To access the Deepgram API you will need a [free Deepgram API Key](https://console.deepgram.com/signup?jump=keys).

## Prerequisites

- [Node v20](https://nodejs.org/en/download/) or higher (though I recommend installing it through [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- [yarn](https://classic.yarnpkg.com/en/docs/install)

## Getting started

Assuming you want to develop "locally", i.e. bring-your-own-key, just set a `DEEPGRAM_API_KEY`
environment variable and run the `dev` command. Any DG key will do, it just needs `usage:write`.

### Create a .env file

Create a `.env` file in the root of the project and add the following:

```
DEEPGRAM_API_KEY=<your-deepgram-api-key>
```

Note: When creating the API Key make sure to select "Member" as the role and not "Default" so that the API Key has permissions to create new API Keys.

See `sample.env.local` for more details.

### Use a CLI-compatible password manager

**Remember:** use minimally-privileged keys, avoid sending them in shell commands, and avoid saving
them as plaintext to files! One secure approach is to use a CLI-compatible password manager like
[pass](https://www.passwordstore.org/) or [bitwarden](https://bitwarden.com/help/cli/). A `pass`
example:

```sh
DEEPGRAM_API_KEY=$(pass deepgram/my-key) yarn dev
```

### Installing dependencies

```sh
yarn install
```

### Running the app

```sh
yarn dev
```

When Next.js starts up, it'll give you a localhost URL to visit.

## Documentation

You can learn more about the Deepgram API at [developers.deepgram.com](https://developers.deepgram.com/docs).

## Development and Contributing

Interested in contributing? We ❤️ pull requests!

To make sure our community is safe for all, be sure to review and agree to our
[Code of Conduct](./.github/CODE_OF_CONDUCT.md). Then see the
[Contribution](./.github/CONTRIBUTING.md) guidelines for more information.

## Getting Help

We love to hear from you so if you have questions, comments or find a bug in the
project, let us know! You can either:

- [Open an issue in this repository](https://github.com/deepgram-devs/deepgram-voice-agent-demo/issues/new)
- [Join the Deepgram Github Discussions Community](https://github.com/orgs/deepgram/discussions)
- [Join the Deepgram Discord Community](https://discord.gg/xWRaCDBtW4)

[license]: LICENSE.txt