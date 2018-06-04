! function () {

    var view = document.querySelectorAll('[data-x]')

    var controller = {
        view: null,

        init: function (view) {
            this.view = view

            for (let i = 0; i < view.length; i++) {
                view[i].classList.add('offset')
            }
            this.findCloseAndRemoveOffset()
            //窗口滚动
            window.addEventListener('scroll', (x) => {
                this.findCloseAndRemoveOffset()
            })
        },

        findCloseAndRemoveOffset: function () {
            var view = this.view
            let minIndex = 0
            //let changeTag = 0
            for (let i = 0; i < view.length; i++) {
                if (Math.abs(view[i].offsetTop - window.scrollY) < Math.abs(view[minIndex].offsetTop - window.scrollY)) {
                    minIndex = i
                }
            }
            let id = view[minIndex].id
            let a = document.querySelector('a[href="#' + id + '"]')
            let li = a.parentNode
            let brothers = li.parentNode.children
            for (let i = 0; i < brothers.length; i++) {
                brothers[i].classList.remove('highLight')
            }
            li.classList.add('highLight')
            view[minIndex].classList.remove('offset')
        }

    }

    controller.init(view)

}.call()