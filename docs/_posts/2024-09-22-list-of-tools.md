---
layout: default
title: A curated list of "tools" I use
---
# A curated list of "tools" I use
As a developer, I have a few trusty tools that help me get the job done. In this blog post, I'll share them with you. Before we start, I just want to say that these tools aren't for everyone and aren't suitable for every task. These are tools I really enjoy using, and I hope you'll find them useful too!

## Learning
- #### [Roppers](https://www.roppers.org/): 
	While this isn't a tool per se, I've found it really helpful for learning about Linux and cyber security. It's free, and at the end of the course, they give you a certificate (although I'm not sure how valuable it is).
- #### [Anki](https://apps.ankiweb.net/):
	This multi-platform flash card app is a great way to help you memorise things. It's content-agnostic, which I've just learned is a word. You can save text, images, videos, and Tex markups as flash cards. The best thing is they even have a large collection of community-shared **[decks](https://ankiweb.net/shared/decks)**!
- #### [Logseq](https://logseq.com/):
	Simply put this is a personal knowledge management system. It has block-based note taking (like Zettelkasten, but even more flexible), and it also has a journaling feature. And you can even query it!

## In the terminal
- #### [foot](https://codeberg.org/dnkl/foot/): 
	If you're on Wayland (and if you're using Ubuntu, then chances are you are already on Wayland), then I'd highly suggest giving "foot" a try as your terminal emulator. It's really easy to set up and with its server-client architecture, you can theoretically reduce the resource usage and start-up times.
- #### [Starship](https://starship.rs/): 
	This is just for ricing (though I find the git features really useful!), you can customise your terminal prompt and since this works on lots of shells you can keep it consistent even if you move your shells.
- #### [neovim](https://neovim.io/): 
	It's my PDE (Persona Development Editor). Neo-vim is built on top of vim, which is great because you can use your vim configurations with this or use Lua to configure it. There's so much to talk about, I'll hopefully write a separate blog post on it soon (lsps, packagers, and more).
- #### [fzf](https://github.com/junegunn/fzf): 
	There's not much to say on this one, it's a fuzzy finder! But you can customize it with shell integrations, so you can fuzzy find in all three most popular shells: bash, zsh, and fish.
- #### [aria2c](https://aria2.github.io/): 
	It is a CLI download manager on steroids! Not only can you download files from HTTP/S (the regular interwebs), but it also supports torrents, FTP, chunk validation, and more.
- #### [Devbox](https://www.jetify.com/devbox): 
	This one is for fellow developers. It's a containerised solution for all your CI (continuous integration) needs. I'm not trying to criticize Docker, but Devbox is a bit easier to configure with JSON, and it uses fewer resources and is more performant because it has no overhead containers.

I could go on forever, but I want to keep this list manageable! There are so many fantastic tools you can use in the terminal. If you'd like to learn more about these awesome tools, just check out the **"[How I find these awesome tools](#finding-tools)"** section.

## My AI needs
- #### [perplexity](https://www.perplexity.ai/): 
	my go to for daily AI needs
- #### [phind](https://www.phind.com/): 
	when perplexity won't do
- #### [Hugging Face](https://huggingface.co/): 
	when I need a Swiss army knife of AI shenanigans
- #### [DeepL](https://www.deepl.com/): 
	I Englishn't

## Other awesome tools
- #### [DuckDuckGo](https://duckduckgo.com/): 
	I've heard this is a rather privacy-friendly search engine, and I've been enjoying the [lite](https://lite.duckduckgo.com/lite/) version for a simple search experience. I have seen some controversies around it, but it has been serving me well.
- #### [searxng](https://github.com/searxng/searxng): 
	It's a self-hosted privacy-oriented meta search engine that's all about making your searching meta. There are some public instances you could use (none of which I'm hosting, so I won't mention them here), but some people might have different opinions about the privacy when using a public instance.
- #### [mpv](https://mpv.io/): 
	A no-nonesence, dead simple media player. But don't be mistaken, it is powerful and can be made even more so with a large collection of **[scripts (extensions)](https://www.google.com/search?&q=awesome+mpv+scripts)**.

## <a id="finding-tools"></a> How I find these awesome tools
I just love going through curated awesome lists! All you have to do is type **"`awesome..list site:github.com`"** into ~~Google~~ (your favourite search engine with regex) and you'll be amazed at how many lists there are. I also like browsing **[alternativeto](https://alternativeto.net)** to find alternatives. And of course, I watch lots of YouTube videos on apps and Linux. So there you have it – that's how I ~~procrastinate~~ find these awesome tools!

## On a final note
Most of these tools are configurable, so I might even upload the dotfiles[1] to this [repo](https://github.com/dhanudhara/dotfiles) at some point in the future.

## Footnotes
	1. https://youtu.be/r_MpUP6aKiQ
