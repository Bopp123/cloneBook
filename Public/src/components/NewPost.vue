<template>
    <div class="main-post ">
        <div class="flex text-center container">
            <div class="post text-center">
                <div>
                    <input v-model="post.title" type="text" placeholder="Title">
                </div>
                <div id="media" v-show="isMedia()" class="text-center">
                </div>
                <div>
                    <textarea v-model="post.content" cols="100" type="textarea"
                              placeholder="...Tell the world whats on your mind"></textarea>
                </div>
                <div>
                    <input v-model="youtube" v-if="showYoutube" class="youtube" ref="youtube" type="text">
                </div>
            </div>

        </div>
        <div class="text-center buttons">
            <button @click="addFoto" class="btn"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span>
                <input @change="getImageInput" class="file" ref="fileImg" type="file" accept="image/*"></button>
            <button class="btn"><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></span><input
                    class="file" ref="fileVideo" type="file" accept="video/*" @change="getVideoInput"></button>
            <button class="btn"><img src="/assets/youtube.png"></span></button>
            <button class="btn post-button" @click="sendPost">Post</button>
        </div>
    </div>
</template>

<script>
    import {eventBus} from "../main";
    import {Global} from '../global.js';
    export default {
        data: function () {
            return {
                post: {},
                showYoutube: false,
                image: {},
                video: {},
                youtube: "",
                fotoAdded: false,
                videoAdded: false,
                ytAdded: false
            }
        },
        computed:{

        },
        methods: {
            isMedia(){
               return this.fotoAdded || this.videoAdded || this.ytAdded;
            },
            getImageInput(event){
                this.fotoAdded = true;
                this.image = event.target.files[0];
                document.getElementById('media').appendChild(this.generateImg(this.image));
            },
            getVideoInput(event){
                this.video = event.target.files[0];
            },
            generateImg(file){
                var img = document.createElement("img");
                img.setAttribute("style", "max-width: 80%;");
                var reader = new FileReader();
                reader.onloadend = function () {
                    img.src = reader.result;
                }
                reader.readAsDataURL(file);
                return img;
            },
            sendPost(){
                console.log(this.post.title,this.post.content)
                if(!this.post.title  && !this.post.content){
                    alert('Pls give your post a title or add some content at least');
                    return;
                }
                const formData = new FormData();
                formData.append("title", this.post.title);
                formData.append('content', this.post.content);
                if (this.fotoAdded) {
                    formData.append("mediaType", "image");
                    formData.append("media", this.image);
                    console.log("image appended")
                }
//                 else if(!this.isEmpty(this.video)){
//                    formData.append("mediaType", "video");
//                    formData.append("video", this.video);
//                }else if(this.youtube !== ""){
//                    formData.append("mediaType", "youtube");
//                    formData.append("video", this.youtube);
//                }
                Global.sendPost(formData)
                    .then((data) => {
                        console.log(data);
                        eventBus.$emit('posted');
                    }, (err) => {
                        console.log(err);
                    })
            },
            addFoto(){
                this.$refs.fileImg.click();
            }
        }

    }
</script>

<style scoped>
    .file {
        display: none;
    }

    .flex {
        display: flex;
        margin-top: 4vh;
        flex-direction: row;
        width: 100%;
    }

    .border {
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 0.5em;
    }

    .btn {

        max-width: 60px;
        max-height: 30px;
        color: white;
        background-color: #333;
        margin-top: 10px;
    }

    .post {
        width: 100%;
        margin-right: auto;
    }

    input {
        width: 100%;
        border: none;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        font-size: 2.5vh;
        font-weight: bold;
        text-align: center;
        outline: none;
        padding-top: 1em;

    }

    textarea {
        margin-top: 5px;
        width: 100%;
        border: none;
        font-size: 2.5vh;
        outline: none;
        min-height: 10vh;

    }

    textarea::-webkit-scrollbar {
        display: none;
    }

    button > img {
        vertical-align: baseline;
    }



    #media {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 2em;
        padding-top: 2em;
    }

    .main-post{
        box-shadow: -1px 9px 46px 0px #333333;
    }

    .buttons{
        padding-bottom: 1em;
    }

    .post-button{

    }

</style>