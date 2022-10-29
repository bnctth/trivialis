<style>
    .bg {
        width: 100vw;
        height: 100vh;
        background-color: #3e4d5c;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .capsule {
        /* height: 50vh; */
        /* min-width: 25vw; */
        padding: 20px;

        background-color: #6f89a3;
        border-radius: 20px;
    }
</style>

<div class="container-fluid bg">
    <div class="row">
        <div class="col-6 mx-auto capsule">
            <slot />
        </div>
    </div>
</div>