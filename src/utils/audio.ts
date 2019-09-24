import {Howl, Howler} from 'howler';
import {FutureInstance} from "fluture";
import * as F from "fluture";

let _global_oneshot:Howl;

export const load_audio = (src:string):FutureInstance<any, Howl> => 
    F.Future((reject, resolve) => {
        const sound = new Howl({src});
        sound.once('load', resolve);
        sound.once('loaderror', reject);
    });


export const stop_global_oneshot = () => {
    if(_global_oneshot != null) {
        _global_oneshot.stop();
        _global_oneshot = null;
    }
}

export const play_global_oneshot = (src:string) => {
    stop_global_oneshot();

    _global_oneshot = new Howl({src});
    _global_oneshot.play();
}


const _play_oneshot_future = (mix_with_global: boolean) => (src:string) => {
    if(!mix_with_global) {
        stop_global_oneshot();
    }

    return F.Future((reject, resolve) => {
        const sound = new Howl({src});
        sound.once('end', resolve);
        sound.play();
        return () => sound.stop();
    });
}

export const play_oneshot_future = _play_oneshot_future(false);
export const play_oneshot_future_mix = _play_oneshot_future(true);