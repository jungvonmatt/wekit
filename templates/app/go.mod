module github.com/jungvonmatt/wekit/templates/app

go 1.17

replace github.com/jungvonmatt/wekit/templates/theme-default => ../../templates/theme-default

replace github.com/jungvonmatt/wekit/hugo-modules/core => ../../hugo-modules/core

require (
	github.com/jungvonmatt/wekit/hugo-modules/core v0.0.0-20220817063049-5415a6ed80a1 // indirect
	github.com/jungvonmatt/wekit/templates/theme-default v0.0.0-20220817063049-5415a6ed80a1 // indirect
)
