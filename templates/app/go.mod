module github.com/jungvonmatt/wekit/templates/app

go 1.17

replace github.com/jungvonmatt/wekit/templates/theme-default => ../../templates/theme-default

replace github.com/jungvonmatt/wekit/hugo-modules/core => ../../hugo-modules/core

require (
	github.com/jungvonmatt/wekit-core v0.5.6 // indirect
	github.com/jungvonmatt/wekit/hugo-modules/core v0.0.0-00010101000000-000000000000 // indirect
	github.com/jungvonmatt/wekit/templates/theme-default v0.0.0-00010101000000-000000000000 // indirect
)
