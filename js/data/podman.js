// Podman Course Chapters Data

export const podmanChapters = [
    {
        id: 'podman-1',
        title: 'Pengenalan Podman',
        mdFile: 'md/podman/01-introduction.md',
        subChapters: [
            { id: 'podman-1-1', title: 'Apa itu Podman?', mdFile: 'md/podman/01-introduction.md#apa-itu-podman' },
            { id: 'podman-1-2', title: 'Instalasi', mdFile: 'md/podman/01-introduction.md#instalasi' },
            { id: 'podman-1-3', title: 'Perintah Dasar', mdFile: 'md/podman/01-introduction.md#perintah-dasar' }
        ]
    },
    {
        id: 'podman-2',
        title: 'Manajemen Container',
        mdFile: 'md/podman/02-container-management.md',
        subChapters: [
            { id: 'podman-2-1', title: 'Running Containers', mdFile: 'md/podman/02-container-management.md#running-containers' },
            { id: 'podman-2-2', title: 'Container Lifecycle', mdFile: 'md/podman/02-container-management.md#container-lifecycle' },
            { id: 'podman-2-3', title: 'Image Management', mdFile: 'md/podman/02-container-management.md#image-management' }
        ]
    },
    {
        id: 'podman-3',
        title: 'Podman Pods dan Networking',
        mdFile: 'md/podman/03-pods-networking.md',
        subChapters: [
            { id: 'podman-3-1', title: 'Pod Basics', mdFile: 'md/podman/03-pods-networking.md#pod-basics' },
            { id: 'podman-3-2', title: 'Networking', mdFile: 'md/podman/03-pods-networking.md#networking' },
            { id: 'podman-3-3', title: 'Use Cases', mdFile: 'md/podman/03-pods-networking.md#use-cases' }
        ]
    }
];
