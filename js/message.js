! function () {

    var view = document.querySelector('.messageSection')

    var model = {
        init: function () {
            var APP_ID = 'uDro3VECkNBjLGoMRwiCrFcw-gzGzoHsz';
            var APP_KEY = 'aauMJImqqikhhC4cW8apJCrR';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find() //Promise对象
        },
        //创建数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ //Promise对象
                'name': name,
                'content': content
            })
        }
    }

    var controller = {
        view: null,
        model: null,
        form: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.model.init()
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                }
            )
        },
        saveMessages: function () {

            var myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            if (name === ''){
                alert('姓名不能为空')
            } else if(content === ''){
                alert('内容不能为空')
            } else {
                this.model.save(name, content).then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                })
            }
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessages()
            })
        }
    }

    controller.init(view, model)

}.call()