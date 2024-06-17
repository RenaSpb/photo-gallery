import React, { useRef, useLayoutEffect, useMemo } from 'react';
import cl from 'classnames';
import { Photo, CommonClassProps } from '../types';
import style from './index.module.scss';

interface TransitionPhotoProps extends CommonClassProps {
    photos: Photo[];
    indexActivePhoto: number;
}

const updatePhotoState = (element: HTMLElement | null, state: 'false' | 'true' | 'prepared') => {
    if (!element) return;

    element.dataset.active = state;
    if (state !== 'false') {
        element.setAttribute('src', element.dataset.src || '');
    }
}

export const TransitionPhoto: React.FC<TransitionPhotoProps> = ({
                                                                    className,
                                                                    photos,
                                                                    indexActivePhoto,
                                                                }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const activePhoto = containerRef.current?.querySelector(`img[data-active="true"]`);
        const nextActivePhoto = containerRef.current?.querySelector(`img:nth-of-type(${indexActivePhoto + 1})`);

        if (activePhoto && activePhoto !== nextActivePhoto) {
            updatePhotoState(activePhoto as HTMLElement, 'false');
        }
        updatePhotoState(nextActivePhoto as HTMLElement, 'true');
    }, [indexActivePhoto]);

    const photoList = useMemo(() => (
        photos.map((photo, id) => (
            <img
                className={style.transitionPhotoImage}
                key={photo.id}
                data-active={id === indexActivePhoto ? 'true' : 'false'}
                data-src={photo.src}
                alt={photo.description}
            />
        ))
    ), [photos, indexActivePhoto]);

    return (
        <div className={cl(style.transitionPhoto, className)} ref={containerRef}>
            {photoList}
        </div>
    );
}
